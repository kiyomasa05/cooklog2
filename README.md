# README

12/31git リポジトリを
フロントエンドとバックエンドで分けるため、新しい github リポジトリを 2 つ作成し、そちらに移行。
こちらのリポジトリは local で docker-compose で開発環境が同時に起動するようになっているので残しておき、本番環境へは新しく作るリポジトリを heroku へアップしていきます

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
