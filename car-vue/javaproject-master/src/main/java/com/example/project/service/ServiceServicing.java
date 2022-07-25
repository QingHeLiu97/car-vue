package com.example.project.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.project.common.Result;
import com.example.project.entity.Notice;
import com.example.project.entity.Servicing;
import com.example.project.mapper.MapperServicing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created with IntelliJ IDEA.
 *
 * @Author: XXXXX
 * @Date: 2022/02/19/17:55
 * @Description:
 */
@Service
public class ServiceServicing {
    @Autowired
    private MapperServicing mapperServicing;

    public Object getPages(Integer current, Integer limit,Integer status, String userName, String userPhone){
        System.out.println(limit);
        QueryWrapper queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(status >=0 ,"status",status);
        queryWrapper.eq(!StringUtils.isBlank(userName),"user_name",userName);
        queryWrapper.eq(!StringUtils.isBlank(userPhone),"user_phone",userPhone);
        queryWrapper.select().orderByDesc("create_time");
        Page<Servicing> pages = new Page<>(current, limit);
        Page<Servicing> pageNotice = mapperServicing.selectPage(pages,queryWrapper);
        Result result = new Result();
        return result.success(pageNotice);
    }



    //新增
    public Object insertData(Servicing servicing){
        Result result = new Result();
        mapperServicing.insert(servicing);
        return result.success();
    }

    //更新
    public Object updateData(Servicing servicing){
        mapperServicing.updateById(servicing);
        Result result = new Result();
        return result.success();
    }
    //删除
    public Object deleteData(Integer id){
        mapperServicing.deleteById(id);
        Result result = new Result();
        return result.success();
    }
}
