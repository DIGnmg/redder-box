{
    "middleware": {
        "grant": {
            "enabled": true,
            "priority": 100,
            "module": {
                "name": "grant-express",
                "arguments": [
                   {
                      "server": {
                        "protocol": "http",
                        "host": "mighty-scrubland-94929.herokuapp.com",
                        "callback": "/handle_reddit_callback",
                        "transport": "session",
                        "state": true
                      },
                      "reddit": {
                        "key": "2Brq1Mv8zQdoUg",
                        "secret": "erATARUu-M2GUCrYWKBTN3SS9Z8",
                        "custom_params": {"duration":"permanent"},
                        "scope": ["identity,mysubreddits,privatemessages,read"],
                        "callback": "/"
                      }
                    }
                ]
            }
        },

        "session": {
            "enabled": true,
            "priority": 90,
            "module": {
                "name": "path:./libs/middleware/redis-session",
                    "arguments": [
                    {
                        "key": "abc123",
                        "secret": "grant",
                        "cookie": {
                            "path": "/",
                            "httpOnly": true,
                            "maxAge": 31556926000
                        },
                        "resave": true,
                        "saveUninitialized": true,
                        "store": null, // NB: this will be overlaid in our module
                        "proxy": null
                    },
                    {
                        "host": "redis://h:pb5nvl1igd8rcj8jsm1862gei7t@ec2-107-21-254-141.compute-1.amazonaws.com",
                        "port": 20489,
                        "prefix": "session:",
                        "ttl": 3600
                    }
                ]
            }
        }
    }
}
