
# ポートフォリオ紹介

**制作したアプリケーションはこちら**
<br>
https://cooklog-frontend.herokuapp.com/

(herokuなので初回起動は遅めです。開かなければ少し時間をおいてください)

**github**
<br>
https://github.com/kiyomasa05/cooklog2

（フロントとバックエンドの親フォルダ）

**Qiita記事**
<br>
https://qiita.com/kiyomasa05/items/bfb08e9694ef4fbae5d2


Cooklogというアプリで、自分の作ったレシピや、他人の作ったレシピを確認、お気に入り登録できます。
お気に入りにしておくとマイページで簡単に確認できる：クックパッドのクローンです

なぜこのアプリを作ったかというと
　**妻を喜ばすためです。**
妻に「どんなアプリがあったらいいと思う？」と聞くと、
「（毎日料理を作るので）クックパッドもいいんだけど、お気に入りのレシピが並べて見れるアプリがいい」
とのことなので、UIにこだわり、自作のレシピとお気に入りのレシピが横並びで見れるアプリを作成しました。

レスポンシブ対応もしています

<img width="30%" alt="レスポンシブ" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1037238/a961974d-5b70-84be-ed63-158fb464aeea.png">

# ポートフォリオに使用した技術

フロントエンド
- Docker 
- docker-compose 
- React
- React-Hook-Form
- chakra-ui
 
バックエンド
- Ruby on Rails (apiモード)
- MySQL

テスト

- Jest
- testing-library
- Rspec

インフラ
- heroku
- AWS S3

コード整形
- ESlint
- pretter

CI／CD
- CircleCi

本番環境ではクライアント側とapi側　別々にデプロイしていますが、ローカル環境ではその親フォルダからDocker-composeで1コマンドで起動できるようにしています。

### システム構成図

herokuを利用
<br>

![名称未設定ファイル.jpg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1037238/e82faa2a-53a9-71a2-2245-177f9a4f6217.jpeg)


### ER図
<br>

![Untitled Diagram-Page-1.drawio.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1037238/fec33385-5b13-668a-99aa-8498541baaad.png)

#### フロントエンド

| 名称      | 説明 | 
|:-----------|:------------|
| React（Create　React　App）   | Javascriptフレームワーク  | 
| React-Hook-Form   | フォームバリデーションライブラリ    | 
| chakra-ui | UIコンポーネント | 


- ATOMICデザインを意識したディレクトリ構成になっています。
- api通信はHooksを使用し、axiosで叩いています。
- 認証はcookieを利用　
- React-Hook-Formは正直めちゃくちゃ使いやすかったです。

大変だったのは、
- rails activestorageを利用した画像の送信
- cookieを利用した認証
- providerへのデータ格納とコンパイル調整対応

この辺はエラーを直すのに１，２週間かかってます、、、
（完全独学なので、ググることはもちろん、関連することをUdemyで勉強したり、教材を購入したり大変でした。
メンターも検討しましたが、利用しませんでした。テラテイルが神）



#### バックエンド

| 名称      | 説明 | 
|:-----------|:------------|
| Ruby on Rails（APIモード）  | apiサーバーとして利用 | 
| MySQL   | データベースマネジメントシステム    | 

- APIサーバーとしてフロントからのリクエストに対し、JSONデータを返す役割
- 画像データはActiveStorage経由でS3バケットに保存してます
- 認証はsessionメソッドを利用（cookie）
-　ローカル環境での認証は、Firefoxを使用するようにしてください（Chromeではcookieのsecure属性がtrueにならない。
-　本番環境はhttps通信でsecure属性がtrueになるためChromeでも問題ないです


#### インフラ　
| 名称      | 説明 | 
|:-----------|:------------|
| heroku | （フロントエンドもバックエンド　）PaaS インフラ周りを任せています | 

- Dockerを利用した開発しているため、herokuでもDockerコンテナで稼働しています。
- heroku.ymlという便利なherokuの設定を利用しデプロイしています

#### CI/CD
| 名称      | 説明 | 
|:-----------|:------------|
| CircleCI | （フロントエンドもバックエンド　）PaaS インフラ周りを任せています | 

- github連携しmasterブランチにpushした際にテスト＆デプロイするように設定しています。







# 機能紹介

### 機能一覧


| 機能名      | 説明 | 
|:-----------|:------------|
| ユーザー機能    | 新規登録、登録内容変更、アバター登録、ログイン、ログアウト   | 
| レシピ投稿機能   | 投稿、編集      | 
| レシピ一覧確認機能 | タイムライン表示、タイトル検索 | 
| お気に入り機能      | 投稿されたレシピをお気に入り登録、解除    |

### 機能詳細

### トップページ

ログイン＆新規登録への遷移のみ
ヘッダーのボタンはログインしているか、していないかで変わるようにしています

<img width="400" alt="スクリーンショット 2022-06-26 9 23 26" src="https://user-images.githubusercontent.com/64081231/176798167-ad97f6c0-b389-419d-bde0-a38cdf6c1cf5.png">
<img width="400" alt="スクリーンショット 2022-06-26 10 09 51" src="https://user-images.githubusercontent.com/64081231/176798174-a92bf6ad-650c-4560-bb34-1f70aa1cf141.png">

### 新規登録　ログインページ
クライアント側のエラーメッセージはyupとreact-hook-formを使用
アバター写真も設定可能にしています。

新規登録
<br>
![signup.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1037238/1379d2de-4238-e95f-88ec-5854b309ba3c.gif)

ログイン
<br>

![ログイン.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1037238/290609f2-a661-b936-f7be-6f627ff03353.gif)


### ユーザー編集
パスワードは任意で変更できるように設定
<br>

![useredit.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1037238/ef464abe-56f0-bb67-418e-8104a182a74d.gif)

### お気に入り登録
投稿レシピ一覧から好きなレシピをクリックするとモーダルにて詳細確認可能
自分が投稿したレシピは編集ボタンが表示され、他人が投稿したレシピにはお気に入り登録ボタンを設置
お気に入りにするとマイページで確認可能になります。
<br>

![favo.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1037238/a336f3d1-d901-4dd3-b67b-8b6d7bdbe69c.gif)

### レシピ投稿
写真と材料、手順、時間などを入力
時間のUIはスライダーとカウンターを採用
<br>

![レシピ投稿.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1037238/ae1a7919-8ddc-8684-d5ae-5720d5a360a7.gif)


### レシピ編集
（初期値の設定に苦労しました、、）
<br>
![編集.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1037238/2fc68d7a-0787-02eb-8119-586407b559c5.gif)

###  レシピ検索
タイトル検索です。
<br>

![検索.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1037238/242415b5-ad8d-ec16-e7a9-0f496e28408f.gif)



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
localhost:3001 で react のアプリに接続できます

