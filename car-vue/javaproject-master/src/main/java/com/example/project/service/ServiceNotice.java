package com.example.project.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.project.common.Result;
import com.example.project.entity.Notice;
import com.example.project.mapper.MapperNotice;
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
public class ServiceNotice {
    @Autowired
    private MapperNotice mapperNotice;
    //    获取分页
    public Object getPages(Integer current, Integer limit){
        System.out.println(current);
        System.out.println(limit);
        QueryWrapper queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("status",1);
        queryWrapper.select().orderByDesc("create_time");
        Page<Notice> pages = new Page<>(current, limit);
        Page<Notice> pageNotice = mapperNotice.selectPage(pages,queryWrapper);
        Result result = new Result();
        return result.success(pageNotice);
    }

    //新增
    public Object insertData(Notice notice){
        Result result = new Result();
        mapperNotice.insert(notice);
        return result.success();
    }

    //更新
    public Object updateData(Notice notice){
        mapperNotice.updateById(notice);
        Result result = new Result();
        return result.success();
    }
    //删除
    public Object deleteData(Integer id){
        mapperNotice.deleteById(id);
        Result result = new Result();
        return result.success();
    }
}
