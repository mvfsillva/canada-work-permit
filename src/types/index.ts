export type VisaTypes = 'WP' | 'OWP' | 'GTS, OWP' | 'WP, OWP' | 'GTS, OWP, VISITOR' | 'WP, OWP, SP'
export type CategoryTypes = 'LMIA' | 'LMIA EXEMPT' | 'GTS'
export type StatusTypes = 'awaiting' | 'processed'

export interface ApplicationType {
  id: string;
  name?: string;
  noc: number;
  application_date: Date;
  application_year: Date;
  visa_response_date?: Date;
  processing_week_time: string;
  processing_month_time: string;
  status: StatusTypes;
  approved?: boolean;
  visa_type: VisaTypes;
  category: CategoryTypes;
}