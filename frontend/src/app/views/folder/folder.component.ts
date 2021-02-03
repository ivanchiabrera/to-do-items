import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserService } from '../../services/user.service';
UserService
@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  constructor(private folderService:FolderService,private userService:UserService) { }

  ngOnInit(): void {
    this.getFolders();
  }

  jwtHelper = new JwtHelperService();
  token=localStorage.getItem("token");
  idUser=this.jwtHelper.decodeToken(this.token).id;  
  name=this.jwtHelper.decodeToken(this.token).name;
  folders=[];  
  numberFolders=0;

  addFolder(form){
    this.folderService.new(this.idUser,form.value.description).subscribe(
      (data)=>{
      form.reset();
      this.folders.push(data.folder);
      this.numberFolders+=1;
      }
    )
  }

  getFolders(){
    this.folderService.all(this.idUser).subscribe(
      (data)=>{
        this.folders=data.folders;        
        this.numberFolders=data.total;
      }
    )
  }

  deleteFolder(folder,i){
    this.folderService.delete(folder._id).subscribe(
      (data)=>{
        this.folders.splice(i,1);
        this.numberFolders-=1;
      }
    )
  }

  logout() {
    this.userService.unLogin();
  }

}
