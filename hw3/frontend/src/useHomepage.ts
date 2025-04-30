import { useState, useEffect } from 'react'

export interface Signer {
  id: number
  name: string
  email: string
  city: string
  state: string
}

export interface FormData {
  name: string
  email: string
  city: string
  state: string
}

const API_BASE = 'http://localhost:5174'

async function fetchSigners(): Promise<any> {
  const res = await fetch(`${API_BASE}/api/signers`)
  if (!res.ok) throw new Error(`Failed to load: ${res.status}`)
  return res.json()
}

async function postSigner(data: any): Promise<any> {
  const res = await fetch(`${API_BASE}/petition`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Submit failed: ${res.status}`)
  const body = await res.json()
  return body.id
}

export default function useHomepage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    city: '',
    state: '',
  })
  const [signatures, setSignatures] = useState<Signer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const loadSignatures = async () => {
    setLoading(true)
    try {
      const data = await fetchSigners()
      setSignatures(data)
      setError(null)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((fd) => ({ ...fd, [name]: value }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      await postSigner(formData)
      setFormData({ name: '', email: '', city: '', state: '' })
      await loadSignatures()
      setError(null)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSignatures()
  }, [])

  return {
    formData,
    signatures,
    loading,
    error,
    loadSignatures,
    handleChange,
    handleSubmit,
  }
}
