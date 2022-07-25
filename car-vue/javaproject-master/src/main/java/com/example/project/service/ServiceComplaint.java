package com.example.project.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.project.common.Result;
import com.example.project.entity.Complaint;
import com.example.project.entity.User;
import com.example.project.mapper.MapperComplaint;
import com.example.project.mapper.MapperUser;
import com.example.project.utils.BizException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 *
 * @Author: XXXXX
 * @Date: 2022/02/19/17:54
 * @Description:
 */
@Service
public class ServiceComplaint {
    @Autowired
    private MapperComplaint mapperComplaint;
//    获取分页
    public Object getPages(Integer current, Integer limit,Integer assessA,Integer assessB,Integer assessC){
        QueryWrapper queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(assessA > 0,"assess_a",assessA);
        queryWrapper.eq(assessB > 0,"assess_b",assessB);
        queryWrapper.eq(assessC > 0,"assess_c",assessC);
        Page<Complaint> pages = new Page<>(current, limit);
        Page<Complaint> pageComplaint = mapperComplaint.selectPage(pages,queryWrapper);
        Result result = new Result();
        return result.success(pageComplaint);
    }


    public Object getMonthData(){
        List<Complaint> listData = mapperComplaint.findMonthData();
        Result result = new Result();
        return result.success(listData);
    }

    //新增
    public Object insertData(Complaint complaint){
        List<Complaint> toDayData = mapperComplaint.findToDayData(complaint.getUserId());
        Result result = new Result();
        if(toDayData != null && toDayData.size() > 0){
            result.setMessage("今日已评价");
            result.setCode("200");
            return result;
        }
        mapperComplaint.insert(complaint);
        result.setMessage("评价成功");
        result.setCode("200");
        return result;
    }

    //更新
    public Object updateData(Complaint complaint){
        mapperComplaint.updateById(complaint);
        Result result = new Result();
        return result.success();
    }
    //删除
    public Object deleteData(Integer id){
        mapperComplaint.deleteById(id);
        Result result = new Result();
        return result.success();
    }
}
