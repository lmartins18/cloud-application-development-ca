require 'singleton'
require 'logger'
require_relative '../../app/services/logger.rb'

RSpec.describe MyLogger do
  let(:logger_instance) { MyLogger.instance }

  it 'logs a message with the specified level' do
    allow_any_instance_of(Logger).to receive(:debug)
    expect(logger_instance.instance_variable_get(:@logger)).to receive(:debug).with('Test message')
    logger_instance.log(:debug, 'Test message')
  end

  it 'logs a message to the specified log file' do
    log_path = 'log/application.log'
    allow_any_instance_of(Logger).to receive(:debug)
    expect_any_instance_of(Logger).to receive(:debug).with('Test message')
    logger_instance.log(:debug, 'Test message')
    expect(File.exist?(log_path)).to be true
    expect(File.read(log_path)).to include('Test message')
  end
end
