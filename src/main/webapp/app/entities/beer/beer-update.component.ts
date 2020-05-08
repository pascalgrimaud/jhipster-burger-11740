import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBeer, Beer } from 'app/shared/model/beer.model';
import { BeerService } from './beer.service';

@Component({
  selector: 'jhi-beer-update',
  templateUrl: './beer-update.component.html',
})
export class BeerUpdateComponent implements OnInit {
  isSaving = false;
  drinkDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [],
    drinkDate: [],
  });

  constructor(protected beerService: BeerService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ beer }) => {
      this.updateForm(beer);
    });
  }

  updateForm(beer: IBeer): void {
    this.editForm.patchValue({
      id: beer.id,
      name: beer.name,
      drinkDate: beer.drinkDate,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const beer = this.createFromForm();
    if (beer.id !== undefined) {
      this.subscribeToSaveResponse(this.beerService.update(beer));
    } else {
      this.subscribeToSaveResponse(this.beerService.create(beer));
    }
  }

  private createFromForm(): IBeer {
    return {
      ...new Beer(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      drinkDate: this.editForm.get(['drinkDate'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBeer>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
