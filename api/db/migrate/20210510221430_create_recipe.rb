class CreateRecipe < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|

      t.references :user, foreign_key: true
      t.string :title,null:false
      t.string :image
      t.time :time_required,null:false
      t.text :food,null:false
      t.text :process,null:false
      t.timestamps
    end
    add_index :recipes, [:user_id, :created_at]
    # 複合インデックス
  end
end
