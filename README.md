+## users　table
|Column|Type|Options|
|------|----|-------|
|password|string|null: false|
|name|string|null:false|
|mail address|text|null: false|

### Association
has_many :comments
has_many :groups, through: :groups_users
has_many :groups_users

## comment　table
|Column|Type|Options|
|------|----|-------|
|image|string|
|content|text|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
belongs_to :user
belongs_to :group

## group table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
has_many :users, through: :groups_users
has_many :comments