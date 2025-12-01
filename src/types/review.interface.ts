
export interface IReview {
    id: string;
    patientId: string;
  
    appointmentId: string;
 
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

export interface IReviewFormData {
    appointmentId: string;
    rating: number;
    comment: string;
}