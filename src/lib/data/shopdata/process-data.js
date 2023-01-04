const https = require("https");
const fs = require("fs");
const shops = require("./../shops.json");

const shopTypeConfig = {
    Shopify: {
        productFeedLocation: "collections/all/products.json",
    },
    WooCommerce: {
        productFeedLocation: "wc/store/products/",
    },
};

function downloadProductFeeds() {
    shops.forEach((shop) => {
        if (!fs.existsSync(shop.dataFolder)) {
            fs.mkdirSync(shop.dataFolder);
        }

        var file = fs.createWriteStream(shop.dataFolder + "/products.json");

        const options = {
            hostname: shop.shopifyUrl,
            port: 443,
            path: "/" + shopTypeConfig[shop.type].productFeedLocation,
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
            },
            method: "GET",
        };

        https.get(options, (res) => {
            res.on("error", (error) => {
                    console.error(
                        shop.shopifyUrl +
                        "/" +
                        shopTypeConfig[shop.type].productFeedLocation +
                        " feed error"
                    );
                    console.error(error);
                })
                .pipe(file)
                .on("finish", () => {
                    console.log(file);
                    file.close();
                    console.info(
                        shop.shopifyUrl +
                        "/" +
                        shopTypeConfig[shop.type].productFeedLocation +
                        " feed downloaded"
                    );
                });
        });
    });
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function* reverseKeys(arr) {
    var key = arr.length - 1;

    while (key >= 0) {
        yield key;
        key -= 1;
    }
}

function getUrlToProduct(product, shop) {
    let urlToProduct =
        shop.shopUrl + "collections/all/products/" + product.handle;
    return urlToProduct;
}

function getProductAvailability(product) {
    let productIsAvailable = false;
    product.variants.forEach((variant) => {
        if (variant.available) {
            productIsAvailable = true;
        }
    });
    return productIsAvailable;
}

function getDiscountPercentage(product) {
    if (product.variants[0].compare_at_price > product.variants[0].price) {
        return (
            Math.ceil(
                ((product.variants[0].price -
                        product.variants[0].compare_at_price) /
                    product.variants[0].compare_at_price) *
                100
            ) + "%"
        );
    } else {
        return;
    }
}

function getProductPrice(product) {
    product.variants.sort((a, b) => a.price - b.price);
    return product.variants[0].price;
}

function getFormattedPrice(product, shop) {
    return shop.currencySymbol + " " + product.variants[0].price;
}

function getCompareAtPrice(product) {
    return product.variants[0].compare_at_price > product.variants[0].price ?
        product.variants[0].compare_at_price :
        "";
}

function saveProcessedProducts(products, location) {
    products = JSON.stringify(products);
    fs.writeFileSync(location, products, (err) => {
        if (err) {
            throw err;
        }
    });
    console.log("Success");
}

function manipulateProductFeeds() {
    shops.forEach((shop) => {
        let productFeedFile = shop.dataFolder + "/products.json";
        let processedProductFeedFile =
            shop.dataFolder + "/products-processed.json";
        console.log("Processing " + productFeedFile);
        try {
            var data = fs.readFileSync(productFeedFile, "utf8");
            var errors = JSON.parse(data).errors;
            var products = JSON.parse(data).products;
            if (errors || !products) {
                console.log("Error while processing " + shop.name + " productfeed: " + errors);
                //detele datafolder
                fs.rm(shop.dataFolder, {
                    recursive: true,
                }, (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(shop.dataFolder + " data folder deleted!");
                    }
                });
                console.log("Skipping...");
                return;
            }
        } catch (err) {
            console.log("Cannot open " + productFeedFile + ":" + err);
            console.log("Skipping...");
        }

        for (var index of reverseKeys(products)) {
            let product = products[index];
            // Delete exclusions
            for (var key in shop.exclusions) {
                if (shop.exclusions[key].indexOf(product[key]) != -1) {
                    console.log("Deleted " + products[index].title);
                    products.splice(index, 1);
                } else if (typeof product[key] == "object") {
                    product[key].forEach((k) => {
                        if (shop.exclusions[key].indexOf(k) != -1) {
                            console.log("Deleted " + products[index].title);
                            products.splice(index, 1);
                        }
                    });
                }
            }

            // Add stuff
            product.shopId = shop.id;
            product.url = getUrlToProduct(product, shop);
            product.available = getProductAvailability(product);
            product.discountPercentage = getDiscountPercentage(product);
            product.price = getProductPrice(product);
            product.formattedPrice = getFormattedPrice(product, shop);
            product.compareAtPrice = getCompareAtPrice(product);

            // Cleanup fields that won't be used
            delete product.variants;
            delete product.options;
        }
        saveProcessedProducts(products, processedProductFeedFile);
    });
}

function mergeProductFeeds() {
    const saveLocation = "./products.json";
    var mergedProducts = [];
    var amountOfShops = shops.length;
    console.log("Merging all feeds");

    shops.forEach((shop) => {
        var productFeedFile = shop.dataFolder + "/products-processed.json";

        try {
            let data = fs.readFileSync(productFeedFile, "utf8");
            products = JSON.parse(data);
            products.forEach((product) => {
                mergedProducts = mergedProducts.concat(product);
            });
        } catch (err) {
            console.log("Cannot open " + productFeedFile + ":" + err);
        }
    });

    var amountOfProducts = mergedProducts.length;
    mergedProducts = JSON.stringify(mergedProducts);

    fs.writeFileSync(saveLocation, mergedProducts, (err) => {
        if (err) {
            throw err;
        }
    });

    console.log(
        "Done: " +
        amountOfProducts +
        " products for " +
        amountOfShops +
        " shops!"
    );
    console.log(formatBytes(fs.statSync(saveLocation).size));
}


// (async function () {
//     await downloadProductFeeds(),
//         await manipulateProductFeeds(),
//         await mergeProductFeeds()
// })();

// downloadProductFeeds();
// manipulateProductFeeds();
mergeProductFeeds();