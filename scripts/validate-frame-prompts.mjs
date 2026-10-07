import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const base=path.join(root,'projects/hanh-trinh-cua-dad/production/remotion');
const lines=fs.readFileSync(path.join(base,'frame-prompt-manifest.jsonl'),'utf8').trim().split(/\r?\n/).map(JSON.parse);
const index=JSON.parse(fs.readFileSync(path.join(base,'frame-prompt-index.json'),'utf8'));
const hero=JSON.parse(fs.readFileSync(path.join(base,'hero-frame-prompts.json'),'utf8'));
const images=JSON.parse(fs.readFileSync(path.join(base,'image-generation-manifest.json'),'utf8'));
const actions=JSON.parse(fs.readFileSync(path.join(base,'frame-actions.json'),'utf8'));
if(lines.length!==2880) throw new Error(`Expected 2880 frames, got ${lines.length}`);
for(let i=0;i<lines.length;i++){
  const r=lines[i];
  if(r.frame!==i) throw new Error(`Frame order mismatch at ${i}`);
  if(r.frame_label!==`F${String(i).padStart(4,'0')}`) throw new Error(`Bad label at ${i}`);
  if(r.prompt_id!==`FRAME_F${String(i).padStart(4,'0')}_V01`) throw new Error(`Bad prompt id at ${i}`);
  if(!r.prompt || r.prompt.length<250) throw new Error(`Prompt too short at ${i}`);
}
if(index.frame_count!==2880 || index.first_frame!==0 || index.last_frame!==2879) throw new Error('Bad index');
if(hero.prompts.length!==19) throw new Error('Expected 19 hero prompts');
if(images.assets.length!==7) throw new Error('Expected 7 generated asset prompts');
if(actions.actions.length<150) throw new Error('Frame action registry unexpectedly short');
const ids=new Set(lines.map(x=>x.prompt_id));
if(ids.size!==2880) throw new Error('Duplicate prompt IDs');
console.log(JSON.stringify({ok:true,frames:lines.length,hero_prompts:hero.prompts.length,image_asset_prompts:images.assets.length,action_ranges:actions.actions.length,first:lines[0].prompt_id,last:lines.at(-1).prompt_id},null,2));
