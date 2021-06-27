# サーバーがHTTP Cookieを処理できるような設定にする

if Rails.env === 'production'
  Rails.application.config.sessions_store :cookie_store,key:'_cooklog',
  domain: ''
  # 'localhost:3001'
else
  Rails.application.config.session_store :cookie_store,key:'_cooklog'
end


if Rails.env === 'environment'
  Rails.application.config.sessions_store :cookie_store,key:'_cooklog',
  domain:'' 
  # 'localhost:3001'
else
  Rails.application.config.session_store :cookie_store,key:'_cooklog'
end
