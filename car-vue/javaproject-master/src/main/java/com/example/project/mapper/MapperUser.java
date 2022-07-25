package com.example.project.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.project.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;



@Mapper
public interface MapperUser extends BaseMapper<User> {
    @Select("SELECT * FROM user WHERE residential = #{residential}" +" AND password = #{password}")
    User accountLogin(@Param("residential") String residential, @Param("password") String password);
}
