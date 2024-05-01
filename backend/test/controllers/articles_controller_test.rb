require 'test_helper'

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @article = articles(:one)
  end

  test 'should get index' do
    get api_v1_articles_url, as: :json
    assert_response :success
  end

  test 'should create article' do
    assert_difference('Article.count') do
      post api_v1_articles_url,
           params: { article: { body: @article.body, published: @article.published, title: @article.title } }, as: :json
    end

    assert_response :created
  end

  test 'should show article' do
    get api_v1_article_url(@article), as: :json
    assert_response :success
  end

  test 'should update article' do
    patch api_v1_article_url(@article),
          params: { article: { body: @article.body, published: @article.published, title: @article.title } }, as: :json
    assert_response :success
  end

  test 'should destroy article' do
    assert_difference('Article.count', -1) do
      delete api_v1_article_url(@article), as: :json
    end

    assert_response :no_content
  end
end
