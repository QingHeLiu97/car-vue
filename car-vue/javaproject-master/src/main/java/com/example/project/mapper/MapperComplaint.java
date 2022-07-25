package com.example.project.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.project.entity.Complaint;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 *
 * @Author: XXXXX
 * @Date: 2022/02/19/17:56
 * @Description:
 */
@Mapper
public interface MapperComplaint extends BaseMapper<Complaint> {
    @Select("SELECT * FROM complaint WHERE user_id = #{userId} AND TO_DAYS(NOW()) =  TO_DAYS(create_time)")
    List<Complaint> findToDayData(@Param("userId") Integer userId);

    @Select("SELECT * FROM complaint WHERE MONTH(`create_time`)=MONTH(NOW()) AND YEAR(`create_time`)=YEAR(NOW()) ")
    List<Complaint>  findMonthData();
}
