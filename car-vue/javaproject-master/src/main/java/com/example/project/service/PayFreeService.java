package com.example.project.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.project.common.Result;
import com.example.project.entity.PayFree;
import com.example.project.entity.User;
import com.example.project.mapper.MapperPayFree;
import com.example.project.mapper.MapperUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class PayFreeService {

    @Autowired(required = false)
    private MapperPayFree mapperPayFree;

    @Autowired(required = false)
    private MapperUser mapperUser;

    public Object insertPayCount(PayFree payFree){
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("id",payFree.getUserId());
        User user = mapperUser.selectOne(queryWrapper);
        payFree.setPhone(user.getPhone());
        payFree.setUsername(user.getName());
        payFree.setCreateTime(new Date());
        Result result = new Result();
        QueryWrapper queryWrapper1 = new QueryWrapper();
        queryWrapper1.eq("user_id",payFree.getUserId());
        List<PayFree> list = mapperPayFree.selectList(queryWrapper1);
        if (list.size()<1){
            payFree.setStatus(0);
            mapperPayFree.insert(payFree);
            result.setMessage("添加成功");
            return result.success();
        }else {
            for (int i = 0; i < list.size(); i++) {
                if (list.get(i).getStatus() == 0){
                    return result.error("该用户已存在待缴费记录");
                }
            }
            payFree.setStatus(0);
            mapperPayFree.insert(payFree);
            result.setMessage("添加成功");
            return result.success();
        }
    }

    public Object deletePayCount(Integer id){
        mapperPayFree.deleteById(id);
        Result result = new Result();
        return result.success();
    }

    public Object updatePayCount(PayFree payFree){
        mapperPayFree.updateById(payFree);
        Result result = new Result();
        return result.success();
    }

    public Object selectPayCount(Integer current, Integer limit,Integer status){
        QueryWrapper queryWrapper = new QueryWrapper<>();
        queryWrapper.ne("status",-1);
        Page<PayFree> pages = new Page<>(current, limit);
        Page<PayFree> pageUsers = mapperPayFree.selectPage(pages,queryWrapper);
        Result result = new Result();
        return result.success(pageUsers);
    }

    public Object selectById(Integer id){
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("user_id",id);
        queryWrapper.eq("status",0);
        PayFree payFree = mapperPayFree.selectOne(queryWrapper);
        Result result = new Result();
        return result.success(payFree);
    }
}
