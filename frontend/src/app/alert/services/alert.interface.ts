export interface IAlert {
  showAlert(type: string, message: string): void;
  clearAlert(): void;
}
