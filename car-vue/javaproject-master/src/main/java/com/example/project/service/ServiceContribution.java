package com.example.project.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.project.common.Result;
import com.example.project.entity.Contribution;
import com.example.project.entity.PayFree;
import com.example.project.mapper.MapperContribution;
import com.example.project.mapper.MapperPayFree;
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
public class ServiceContribution {
    @Autowired(required = false)
    private MapperContribution mapperContribution;

    @Autowired(required = false)
    private MapperPayFree mapperPayFree;

    //    获取分页
    public Object getPages(Integer current, Integer limit,Integer userId,String type,String project,String userName,String userPhone){
        QueryWrapper queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(!StringUtils.isBlank(type),"type",type);
        queryWrapper.eq(!StringUtils.isBlank(project),"project",project);
        queryWrapper.eq(!StringUtils.isBlank(userName),"user_name",userName);
        queryWrapper.eq(!StringUtils.isBlank(userPhone),"user_phone",userPhone);
        queryWrapper.eq(userId > 0,"user_id",userId);
        Page<Contribution> pages = new Page<>(current, limit);
        Page<Contribution> pageContribution = mapperContribution.selectPage(pages,queryWrapper);
        Result result = new Result();
        return result.success(pageContribution);
    }

    //新增
    public Object insertData(Contribution contribution){
        Result result = new Result();
        mapperContribution.insert(contribution);
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.eq("user_id",contribution.getUserId());
        List<PayFree> list = mapperPayFree.selectList(wrapper);
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getStatus()==0){
                list.get(i).setStatus(1);
                mapperPayFree.update(list.get(i),wrapper);
                result.setMessage("缴费成功");
                result.setCode("200");
                return result;
            }
        }
        return result.error("缴费失败,请联系管理员");
    }

}
