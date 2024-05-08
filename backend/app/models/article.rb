class Article < ApplicationRecord
  validates :title, presence: true
  validates :body, presence: true
  validates :published, inclusion: { in: [true, false] }

  attribute :published, :boolean, default: false
end
