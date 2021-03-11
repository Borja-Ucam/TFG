/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExcelPacienteService } from './excelPaciente.service';

describe('Service: ExcelPaciente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExcelPacienteService]
    });
  });

  it('should ...', inject([ExcelPacienteService], (service: ExcelPacienteService) => {
    expect(service).toBeTruthy();
  }));
});
