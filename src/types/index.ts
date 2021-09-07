export type VisaTypes =
  | 'WP'
  | 'OWP'
  | 'GTS, OWP'
  | 'WP, OWP'
  | 'GTS, OWP, VISITOR'
export type CategoryTypes = 'LMIA' | 'LMIA EXEMPT' | 'GTS'
export type StatusTypes = 'awaiting' | 'approved' | 'not approved'

export interface ApplicationType {
  id: string
  name?: string
  noc: number
  application_date: string
  application_year: string
  visa_response_date?: string
  date_processing_week: string
  date_processing_month: string
  status: StatusTypes
  approved?: boolean
  visa_type: VisaTypes
  category: CategoryTypes
}
