const Command = require("../structures/Command");
const fetch = require('node-fetch');

module.exports = new Command({
    name: "getNft",
    description: "Gets random NFT from user ERC20 address",

    async run(message, args, client) {
        try {
            const resp = await fetch(`https://api.opensea.io/api/v1/assets?owner=${args[1]}&order_direction=desc&offset=0&limit=50`)
                .then(response => {
                    if (!response.ok) throw new Error(response.status)
                    return response.json()
                });

            const formattedResp = resp.assets.map(asset => {
                return {
                    imgPreview: asset.image_preview_url,
                    nftLink: asset.permalink
                }
            })

            const randomArrIndex = Math.floor((Math.random() * formattedResp.length));
            const selectedNft = formattedResp[randomArrIndex]

            message.reply({
                content: `Here's a random NFT from that address: ${selectedNft.nftLink}`,
                embeds: [
                    {
                        thumbnail: {
                            url: selectedNft.imgPreview
                        }
                    }
                ]
            })
        } catch (err) {
            console.log(err)
            message.reply(`:( Something went wrong ${err}. Check your ERC20 address and try again`)
        }
    }
});
