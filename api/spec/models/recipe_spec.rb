require 'rails_helper'

RSpec.describe Recipe, type: :model do
    it "レシピ登録できるか" do
      expect(FactoryBot.create(:recipe)).to be_valid
    end
    it "ユーザーの情報がない状態でレシピ登録するとエラー" do
      expect(FactoryBot.build(:recipe,user_id: nil)).to_not be_valid
    end
    it "titleが空のエラーチェック" do
      expect(FactoryBot.build(:recipe,title:"")).to_not be_valid
    end
    it "所要時間(time_required)が空のエラーチェック" do
      expect(FactoryBot.build(:recipe,time_required:"")).to_not be_valid
    end
    it "材料（food）が空のエラーチェック" do
      expect(FactoryBot.build(:recipe,food:"")).to_not be_valid
    end
    it "手順が空のエラーチェック" do
      expect(FactoryBot.build(:recipe,process:"")).to_not be_valid
    end
    it "ユーザーが削除されたら関連するレシピも削除される" do
      # FactoryBot.build(:recipe)
      # expect(FactoryBot.build(:recipe,process:"")).to_not be_valid
    end
end
