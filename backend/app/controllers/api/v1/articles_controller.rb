class Api::V1::ArticlesController < ApplicationController
  before_action :set_article, only: %i[show update destroy]

  # GET /articles
  def index
    @articles = ArticleService.index

    render json: @articles
  end

  # GET /articles/1
  def show
    render json: @article
  end

  # POST /articles
  def create
    @article = ArticleService.create(article_params)

    if @article.persisted?
      render json: @article.id, status: :created, location: api_v1_article_url(@article)
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /articles/1
  def update
    if @article
      @article = ArticleService.update(params[:id], article_params)
      if @article
        render json: @article
      else
        render json: { error: 'Article not found' }, status: :not_found
      end
    else
      render json: { error: 'Article not found' }, status: :not_found
    end
  end

  # DELETE /articles/1
  def destroy
    if @article
      @article = ArticleService.destroy(params[:id])
      render json: ArticleService.index, status: :no_content
    else
      render json: { error: 'Article not found' }, status: :not_found
    end
  end

  private

  def set_article
    @article = ArticleService.show(params[:id])
    unless @article
      render json: { error: 'Article not found' }, status: :not_found
    end
  end

  def article_params
    params.require(:article).permit(:title, :body, :published)
  end
end
