class ArticleService
  def self.index
    MyLogger.instance.log(:info, 'Fetching all articles')
    Article.all
  end

  def self.show(id)
    MyLogger.instance.log(:info, "Fetching article with ID: #{id}")
    Article.find_by(id: id)
  end

  def self.create(article_params)
    MyLogger.instance.log(:info, 'Creating a new article')
    article = Article.new(article_params)
    if article.save
      MyLogger.instance.log(:info, "Article created successfully: #{article.id}")
      article
    else
      MyLogger.instance.log(:error, "Failed to create article: #{article.errors.full_messages.join(', ')}")
      nil
    end
  end

  def self.update(id, article_params)
    MyLogger.instance.log(:info, "Updating article with ID: #{id}")
    article = Article.find_by(id: id)
    return nil unless article

    if article.update(article_params)
      MyLogger.instance.log(:info, "Article updated successfully: #{id}")
      article
    else
      MyLogger.instance.log(:error, "Failed to update article: #{article.errors.full_messages.join(', ')}")
      nil
    end
  end

  def self.destroy(id)
    MyLogger.instance.log(:info, "Destroying article with ID: #{id}")
    article = Article.find_by(id: id)
    return nil unless article

    if article.destroy
      MyLogger.instance.log(:info, "Article destroyed successfully: #{id}")
      article
    else
      MyLogger.instance.log(:error, "Failed to destroy article: #{article.errors.full_messages.join(', ')}")
      nil
    end
  end
end
