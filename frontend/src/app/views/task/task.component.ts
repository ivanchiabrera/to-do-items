import { Component, OnInit,TemplateRef  } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(private userService: UserService, private taskService: TaskService,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getTasks();
  }
  
  jwtHelper = new JwtHelperService();
  token=localStorage.getItem("token");
  idUser=this.jwtHelper.decodeToken(this.token).id;
  name=this.jwtHelper.decodeToken(this.token).name;
  tasks=[];
  numberTasks=0;
  taskEdit:any;
  indexTaskEdit:any;

  getTasks(){
    this.taskService.all(this.idUser).subscribe(
      (data)=>{
        this.tasks=data.tasks;
        this.numberTasks=data.total;
      }
    )
  }

  addTask(form) {
    console.log(form.value.description);
    console.log(this.idUser);
    this.taskService.new(this.idUser,form.value.description,false).subscribe(
      (data)=>{
        this.tasks.push(data.task);
        this.numberTasks+=1;
        form.reset();
      }
    )
  }

  logout() {
    this.userService.unLogin();
  }

  returnClass(done){
    if(done==true){
      return 'line-through'
    }
  }

  check(task,index){
    this.taskService.update(task._id,task.description,!task.done).subscribe(
      (data)=>{
        this.tasks[index]=data.taskSaved;
      }
    )
  }

  delete(task,index){
    this.taskService.delete(task._id).subscribe(
      (data)=>{
        this.tasks.splice(index,1);
        this.numberTasks-=1;
      }
    )
  }

  openModal(template: TemplateRef<any>,task,index) {
    this.modalRef = this.modalService.show(template);
    this.indexTaskEdit=index;
    this.taskEdit=task;
  }


  updateTask(form){
    this.taskService.update(this.taskEdit._id,form.value.description,this.taskEdit.done).subscribe(
      (data)=>{
        this.tasks[this.indexTaskEdit]=data.taskSaved;
      }
    )
  }
}
