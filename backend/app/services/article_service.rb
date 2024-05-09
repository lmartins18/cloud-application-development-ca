class ArticleService
  def self.index
    Article.all
  end

  def self.show(id)
    Article.find_by(id: id)
  end

  def self.create(article_params)
    article = Article.new(article_params)
    article.save
    article
  end

  def self.update(id, article_params)
    article = Article.find_by(id: id)
    return nil unless article

    article.update(article_params)
    article
  end

  def self.destroy(id)
    article = Article.find_by(id: id)
    return nil unless article

    article.destroy
    article
  end
end
