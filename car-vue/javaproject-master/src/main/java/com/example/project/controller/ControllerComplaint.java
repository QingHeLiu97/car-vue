package com.example.project.controller;

import com.example.project.config.UserLoginToken;
import com.example.project.entity.Complaint;
import com.example.project.entity.User;
import com.example.project.service.ServiceComplaint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created with IntelliJ IDEA.
 *
 * @Author: XXXXX
 * @Date: 2022/02/19/0:59
 * @Description:
 */
@RestController
@RequestMapping("complaint")
public class ControllerComplaint {

    @Autowired
    ServiceComplaint serviceComplaint;

    @UserLoginToken
    @GetMapping("pages")
    @ResponseBody
    public Object getPages(
            @RequestParam(value = "current", defaultValue = "1") Integer current,
            @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize,
            @RequestParam(value = "assessA",defaultValue = "0") Integer assessA,
            @RequestParam(value = "assessB",defaultValue = "0") Integer assessB,
            @RequestParam(value = "assessC",defaultValue = "0") Integer assessC
    ){
        return serviceComplaint.getPages(current,pageSize,assessA,assessB,assessC);
    }


    @UserLoginToken
    @GetMapping("getMonthList")
    @ResponseBody
    public Object getMonthList(){
        return serviceComplaint.getMonthData();
    }

    @UserLoginToken
    @PostMapping("insert")
    @ResponseBody
    public Object insert(@RequestBody Complaint complaint){
        return serviceComplaint.insertData(complaint);
    }

    @UserLoginToken
    @PostMapping("update")
    @ResponseBody
    public Object update(@RequestBody Complaint complaint){
        return serviceComplaint.updateData(complaint);
    }

    @UserLoginToken
    @GetMapping("delete")
    @ResponseBody
    public Object delete(@RequestParam(value = "id", defaultValue = "") Integer id){
        return serviceComplaint.deleteData(id);
    }
}
