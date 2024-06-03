# Edgar Watcher
This application takes an array of tickers and sets up a "watcher" that will query the edgar database for new 8k's.
When found it will send a notification via a discord webhook

### Run Locally
Create a copy of src/environment.example.ts and provide your own values.
Then run `npm run start`

### Deployment
For first time deploys you need to generate an ssh key
Run these commands
```
ssh-keygen -t rsa -b 2048
ssh-copy-id user@remote_server
<enter password>
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

You also need to add some environment variables
`PI_USER="<user_name>"`
`PI_IP="<ip_address_to_ssh_to>"`

Afterwards your deploy is as easy as `./deploy.sh`

### Additional Notes

// endpoints - https://www.sec.gov/files/company_tickers.json


Discord webhook format
```
{
    "username": "Webhook",
    "avatar_url": "https://i.imgur.com/4M34hi2.png",
    "content": "Text message. Up to 2000 characters.",
    "embeds": [
        {
            "author": {
                "name": "Birdie♫",
                "url": "https://www.reddit.com/r/cats/",
                "icon_url": "https://i.imgur.com/R66g1Pe.jpg"
            },
            "title": "Title",
            "url": "https://google.com/",
            "description": "Text message. You can use Markdown here. *Italic* **bold** __underline__ ~~strikeout~~ [hyperlink](https://google.com) `code`",
            "color": 15258703,
            "fields": [
                {
                    "name": "Text",
                    "value": "More text",
                    "inline": true
                },
                {
                    "name": "Even more text",
                    "value": "Yup",
                    "inline": true
                },
                {
                    "name": "Use `\"inline\": true` parameter, if you want to display fields in the same line.",
                    "value": "okay..."
                },
                {
                    "name": "Thanks!",
                    "value": "You're welcome :wink:"
                }
            ],
            "thumbnail": {
                "url": "https://upload.wikimedia.org/wikipedia/commons/3/38/4-Nature-Wallpapers-2014-1_ukaavUI.jpg"
            },
            "image": {
                "url": "https://upload.wikimedia.org/wikipedia/commons/5/5a/A_picture_from_China_every_day_108.jpg"
            },
            "footer": {
                "text": "Woah! So cool! :smirk:",
                "icon_url": "https://i.imgur.com/fKL31aD.jpg"
            }
        }
    ]
}
```