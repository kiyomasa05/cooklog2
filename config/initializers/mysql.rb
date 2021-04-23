# Specified key was too long; max key length is 767 byte
# への対策。メアドをプライマリーキーとした場合DBのサイズが超えてしまうため


# require 'active_record/connection_adapters/abstract_mysql_adapter'

# module ActiveRecord
#   module ConnectionAdapters
#     class AbstractMysqlAdapter
#       NATIVE_DATABASE_TYPES[:string] = { :email => "varchar", :limit => 100 }
#     end
#   end
# end
