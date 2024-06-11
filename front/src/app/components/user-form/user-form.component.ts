import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User = new User();
  isEditMode = false;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEditMode = true;
      this.userService.getUser(id).subscribe((data: User) => {
        this.user = data;
      });
    }
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.user.name);
    formData.append('first_name', this.user.first_name);
    formData.append('last_name', this.user.last_name);
    formData.append('email', this.user.email);
    formData.append('password', this.user.password);
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    if (this.isEditMode) {
      this.userService.updateUser(this.user.id!, formData).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.addUser(formData).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
