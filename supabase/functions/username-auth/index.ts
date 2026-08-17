import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

const cors = { 'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type','Access-Control-Allow-Methods':'POST, OPTIONS','Content-Type':'application/json' }
const json=(x:any,s=200)=>new Response(JSON.stringify(x),{status:s,headers:cors})

serve(async req=>{
  if(req.method==='OPTIONS') return new Response('ok',{headers:cors})
  if(req.method!=='POST') return json({error:'method_not_allowed'},405)
  try {
    const { action, username, password } = await req.json()
    const u=String(username||'').trim().toLowerCase()
    const p=String(password||'')
    if(!/^[a-zA-Z0-9_]{3,24}$/.test(u)) return json({error:'Tên tài khoản 3-24 ký tự, chỉ gồm chữ, số và _.'},400)
    if(p.length<6) return json({error:'Mật khẩu phải có ít nhất 6 ký tự.'},400)
    const base=Deno.env.get('SUPABASE_URL')!
    const key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const email=`${u}@username.shopziclcrblx.local`
    if(action==='register') {
      const r=await fetch(`${base}/auth/v1/admin/users`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({email,password:p,email_confirm:true,user_metadata:{username:u}})})
      const d=await r.json()
      if(!r.ok) return json({error:d.msg||d.message||d.error_description||'Không tạo được tài khoản.'},r.status)
    } else if(action!=='login') return json({error:'invalid_action'},400)
    const r=await fetch(`${base}/auth/v1/token?grant_type=password`,{method:'POST',headers:{apikey:key,'Content-Type':'application/json'},body:JSON.stringify({email,password:p})})
    const d=await r.json()
    if(!r.ok) return json({error:d.error_description||d.msg||'Tên tài khoản hoặc mật khẩu không đúng.'},r.status)
    return json(d)
  } catch(e) { return json({error:e instanceof Error?e.message:'server_error'},500) }
})
