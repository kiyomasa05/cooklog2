require 'rails_helper'

RSpec.describe "Signups", type: :request do
  describe "post/signups" do
    
      it '新しいUserを作成する' do
        post 'http://localhost:3000/api/v1/signup',
        params:{user:{name: 'aaaaa', email: 'sample@sample.com', password: '1234', password_confirmation: '1234' }}

        expect(response).to have_http_status(:ok)
        #ポストデータを受け取り、Userのカウントを1増やす
        # expect().to change(User, :count).by(+1)
        
    end
  end
end
