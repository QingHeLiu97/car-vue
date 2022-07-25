package com.example.project.service;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.project.common.Result;
import com.example.project.entity.PayFree;
import com.example.project.entity.User;
import com.example.project.mapper.MapperPayFree;
import com.example.project.mapper.MapperUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService {

    @Autowired(required = false)
    private MapperUser mapperUser;

    @Autowired(required =  false)
    private MapperPayFree mapperPayFree;

    //用户列表查询分页
    public Object findPage(Integer current, Integer limit,String role, String name,String phone,String idCard,Integer status){

        QueryWrapper queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(!StringUtils.isBlank(name),"name",name);
        queryWrapper.eq(!StringUtils.isBlank(phone),"phone",phone);
        queryWrapper.eq(!StringUtils.isBlank(idCard),"id_card",idCard);
        queryWrapper.eq(!StringUtils.isBlank(role),"role",role);
        queryWrapper.eq(status != -1,"status",status);
        Page<User> pages = new Page<>(current, limit);
        Page<User> pageUsers = mapperUser.selectPage(pages,queryWrapper);
        System.out.println(pageUsers.getTotal());
        Result result = new Result();
        return result.success(pageUsers);
    }

    //新增用户
    public Object insertUser(User user){
        mapperUser.insert(user);
        Result result = new Result();
        result.setMessage("添加成功");
        return result.success();
    }

    //更新用户
    public Object updateUser(User user){
        mapperUser.updateById(user);
        Result result = new Result();
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.eq("user_id",user.getId());
        List<PayFree> list = mapperPayFree.selectList(wrapper);
        for (int i = 0; i < list.size(); i++) {
            list.get(i).setUsername(user.getName());
            list.get(i).setPhone(user.getPhone());
            mapperPayFree.update(list.get(i),wrapper);
        }

        return result.success();
    }
    //删除用户
    public Object deleteUser(Integer id){
        mapperUser.deleteById(id);
        Result result = new Result();
        return result.success();
    }

    //通过ID获取用户信息
    public User findUserById(String userId) {
        return mapperUser.selectById(userId);
    }
}
