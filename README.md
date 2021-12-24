# README

開発中

## local での起動方法

作業ディレクトリ(cooklog)で

`docker-compose build `を実行し
`docker-compose up -d`でコンテナを起動
必要に応じて、`docker-compose logs`でエラーを確認

イメージを作り直した時は、
`docker-compose run api rake rails db:create db:migate`
でデータベースも作成する必要がある

コンテナが起動したら
localhost:3000 で rails のトップページ
localhost:3001 で react のアプリに接続できる
