package com.example.project.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.project.entity.Notice;
import com.example.project.entity.PayFree;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MapperPayFree extends BaseMapper<PayFree> {
}
