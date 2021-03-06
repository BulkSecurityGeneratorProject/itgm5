import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Prognose } from './prognose.model';
import {Cenario} from "../cenario/cenario.model";
@Injectable()
export class PrognoseService {

    private resourceUrl = 'api/prognoses';

    constructor(private http: Http) { }

    create(prognose: Prognose): Observable<Prognose> {
        const copy: Prognose = Object.assign({}, prognose);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(prognose: Prognose): Observable<Prognose> {
        const copy: Prognose = Object.assign({}, prognose);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Prognose> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }
    private createRequestOption(req?: any): BaseRequestOptions {
        const options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            const params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
    getPrognosesByCenario(cenario: Cenario): Observable<Prognose[]> {
        if (!cenario) {
            return Observable.of([]);
        }
        return this.query().map( (res) => res.json().filter((prognose) => prognose.cenario.id === cenario.id ) );
    }
}
