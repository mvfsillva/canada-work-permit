import { useCallback, useState } from 'react'
import { supabase } from './supabase-config'

export const useSupabase = <SupabaseType>(table: string) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [data, setData] = useState<SupabaseType[]>([])
  const [values, setValues] = useState<SupabaseType>(null)

  const get = useCallback(async () => {
    try {
      const { body } = await supabase.from<SupabaseType>(table).select('*')
      setData(body)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [table])

  const getOne = useCallback(
    async (id: SupabaseType[keyof SupabaseType]) => {
      try {
        const { body } = await supabase
          .from<SupabaseType>(table)
          .select('*')
          .eq('id' as keyof SupabaseType, id)

        if (body.length > 0) {
          setValues(body[0])
        }
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    },
    [table]
  )

  const save = useCallback(
    async (
      data: Partial<SupabaseType>,
      id?: SupabaseType[keyof SupabaseType]
    ) => {
      try {
        if (id) {
          await supabase
            .from<SupabaseType>(table)
            .update(data)
            .match({ id: id })
        } else {
          await supabase.from<SupabaseType>(table).insert(data)
        }
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    },
    [table]
  )

  const remove = useCallback(
    async (id: SupabaseType[keyof SupabaseType]) => {
      try {
        await supabase.from<SupabaseType>(table).delete().match({ id: id })
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    },
    [table]
  )

  return {
    loading,
    data,
    error,
    values,
    get,
    getOne,
    save,
    remove
  }
}
