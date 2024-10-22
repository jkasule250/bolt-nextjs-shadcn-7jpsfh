import { Toast } from "@/components/ui/toast"

import {
  useToast as useToastBase,
  type ToastActionElement,
} from "@/components/ui/toast"

export type ToastProps = Toast

export type ToastActionProps = ToastActionElement

export const useToast = useToastBase