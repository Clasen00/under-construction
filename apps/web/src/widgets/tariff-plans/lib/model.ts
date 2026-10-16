import type { TariffsPageContent } from '@/shared/api'

export type TariffPeriod = NonNullable<TariffsPageContent['periods']>[number]
export type TariffProductTab = NonNullable<TariffsPageContent['products']>[number]
export type TariffPlan = NonNullable<TariffsPageContent['plans']>[number]
export type TariffPlanVariant = NonNullable<TariffPlan['variants']>[number]
export type TariffFeatureGroup = NonNullable<TariffPlan['featureGroups']>[number]
export type TariffBundle = NonNullable<TariffsPageContent['bundles']>[number]
export type TariffConsultation = NonNullable<TariffsPageContent['consultation']>
