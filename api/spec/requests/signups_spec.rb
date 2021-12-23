require 'rails_helper'

RSpec.describe "Signups", type: :request do
  describe "post/signups" do
    signup_url='http://localhost:3000/api/v1/signup'
    context '正常可動' do
      
        it '新しいUserを作成する' do
          expect do
            post signup_url,params:{user:{name:"sample",email:"sample@sample.com",password:"foobar",password_confirmation:"foobar"}}
            expect(response).to have_http_status(:ok)
            #ポストデータを受け取り、Userのカウントを1増やす
          end.to change {User.count}.by(+1)
        end
        it '新しいUserを作成後ログインする' do
          post signup_url,params:{user:{name:"sample",email:"sample@sample.com",password:"foobar",password_confirmation:"foobar"}}
          expect(is_logged_in?).to be_truthy
        end
        it '新しいUserを作成後jsonデータを返す' do
          post signup_url,params:{user:{name:"sample",email:"sample@sample.com",password:"foobar",password_confirmation:"foobar"}}
          expect(json['status']).to eq("created")
          expect(json['logged_in']).to eq(true)
          expect(json["user"]["name"]).to eq("sample")
          expect(json["user"]["email"]).to eq("sample@sample.com")
        end
    end
    context 'エラー時' do
      it 'ステータスコード500をjsonで返す' do
        post signup_url,params:{user:{name:"sample",email:"",password:"foobar",password_confirmation:"foobar"}}
        expect(json['status']).to eq(500)
      end
    end
  end
end
