require 'singleton'
require 'logger'

class MyLogger
  include Singleton

  def initialize
    @logger = Logger.new('log/application.log') # Log to a file named application.log in the log directory
    @logger.datetime_format = '%Y-%m-%d %H:%M:%S'
    @logger.level = Logger::DEBUG
  end

  def log(level, message)
    @logger.send(level, message)
  end
end
