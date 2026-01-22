import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customerservice';
import { CreateCustomer } from '../create-customer';
import { UpdateCustomer } from '../update-customer';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // ✅ Add CommonModule & ReactiveFormsModule
  templateUrl: './customer-form.html',
  styleUrls: ['./customer-form.css']
})
export class CustomerFormComponent implements OnInit {
  @Input() customerId?: number;

  form!: FormGroup;

  constructor(private fb: FormBuilder, private service: CustomerService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      loyaltyPoints: [0]
    });

    if (this.customerId) {
      this.loadCustomer(this.customerId);
    }
  }

  loadCustomer(id: number) {
    // We'll fix the service method issue below
  }

  save() {  // ✅ Previously it was `onSubmit()`, template expects `save()`
    const { name = '', email = '', phone = '', address = '', loyaltyPoints = 0 } = this.form.value;

    if (this.customerId) {
      const updateDto: UpdateCustomer = { name, email, phone, address, loyaltyPoints };
      this.service.updateCustomer(this.customerId, updateDto).subscribe(() => {
        console.log('Customer updated');
      });
    } else {
      const createDto: CreateCustomer = { name, email, phone, address };
      this.service.createCustomer(createDto).subscribe(() => {
        console.log('Customer created');
      });
    }
  }
}
