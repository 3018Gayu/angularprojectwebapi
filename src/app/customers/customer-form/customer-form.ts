import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customerservice';
import { CreateCustomer } from '../create-customer';
import { UpdateCustomer } from '../update-customer';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './customer-form.html',
  styleUrls: ['./customer-form.css']
})
export class CustomerFormComponent implements OnInit {
  customerId?: number;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      loyaltyPoints: [0]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.customerId = +idParam;
      this.loadCustomer(this.customerId);
    }
  }

  loadCustomer(id: number) {
    this.service.getCustomer(id).subscribe(c => {
      this.form.patchValue({
        name: c.name,
        email: c.email,
        phone: c.phone,
        address: c.address,
        loyaltyPoints: c.loyaltyPoints
      });
    });
  }

  save() {
    const { name, email, phone, address, loyaltyPoints } = this.form.value;

    if (this.customerId) {
      const updateDto: UpdateCustomer = { name, email, phone, address, loyaltyPoints };
      this.service.updateCustomer(this.customerId, updateDto)
        .subscribe(() => this.router.navigate(['/customers']));
    } else {
      const createDto: CreateCustomer = { name, email, phone, address };
      this.service.createCustomer(createDto)
        .subscribe(() => this.router.navigate(['/customers']));
    }
  }

  cancel() {
    this.router.navigate(['/customers']);
  }
}
