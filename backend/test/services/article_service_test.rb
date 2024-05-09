require 'spec_helper'

RSpec.describe ArticleService do
  describe '.index' do
    it 'fetches all articles' do
      expect(MyLogger.instance).to receive(:log).with(:info, 'Fetching all articles')
      allow(Article).to receive(:all)
      ArticleService.index
    end
  end

  describe '.show' do
    it 'fetches an article by ID' do
      id = 1
      expect(MyLogger.instance).to receive(:log).with(:info, "Fetching article with ID: #{id}")
      allow(Article).to receive(:find_by).with(id: id)
      ArticleService.show(id)
    end
  end

  describe '.create' do
    it 'creates a new article' do
      article_params = { title: 'Test Article', body: 'Test body' }
      expect(MyLogger.instance).to receive(:log).with(:info, 'Creating a new article')
      article = instance_double(Article, id: 1, save: true, errors: [])
      allow(Article).to receive(:new).with(article_params).and_return(article)
      expect(article).to receive(:save)
      ArticleService.create(article_params)
    end
  end

  describe '.update' do
    it 'updates an existing article' do
      id = 1
      article_params = { title: 'Updated Article' }
      expect(MyLogger.instance).to receive(:log).with(:info, "Updating article with ID: #{id}")
      article = instance_double(Article, update: true, errors: [])
      allow(Article).to receive(:find_by).with(id: id).and_return(article)
      expect(article).to receive(:update).with(article_params)
      ArticleService.update(id, article_params)
    end
  end

  describe '.destroy' do
    it 'destroys an existing article' do
      id = 1
      expect(MyLogger.instance).to receive(:log).with(:info, "Destroying article with ID: #{id}")
      article = instance_double(Article, destroy: true)
      allow(Article).to receive(:find_by).with(id: id).and_return(article)
      expect(article).to receive(:destroy)
      ArticleService.destroy(id)
    end
  end
end
