import { AbstractControl, FormGroup } from "@angular/forms";

export class CustomValidators {
    static confirmedValidator(control: AbstractControl) {
        const password: string = control.get('newPassword').value;
        const confirmPassword: string = control.get('confirmPassword').value;
        if (password !== confirmPassword) {
            control.get('confirmPassword').setErrors({ match: true });
        }
    }
}
