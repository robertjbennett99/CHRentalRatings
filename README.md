# ZRDJ Stock Sentiments

This project is designed to allow users to create personalized lists of stock tickers, similar to a watch-list on a brokerage app. However, unlike typical watch-lists this platform does NOT display financial statistics and fundamentals. Instead, we use sentiment analysis to monitor public opinions of each stock, whcih can be equally important to understand as an investor. For obvious example: a sudden plunge in public opinion of IBM may influence whether an investor would want to own/trade IBM stock.

Our sentiment analysis gathers data using the Twitter API and News API. Recent headlines and tweets containing each respective stock ticker symbol are pulled and rated using sentiment analysis.

Tech stack used: JS/HTML/CSS. CDN used to access modules such as axios, ajax, bulma.

Login and user data is stored on a backend hosted by heroku. Backend code can be found here: https://github.com/robertjbennett99/ZRDJStockSentimentBackend


 