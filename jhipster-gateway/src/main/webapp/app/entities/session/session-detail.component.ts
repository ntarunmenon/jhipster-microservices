import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Session } from './session.model';
import { SessionService } from './session.service';

@Component({
    selector: 'jhi-session-detail',
    templateUrl: './session-detail.component.html'
})
export class SessionDetailComponent implements OnInit, OnDestroy {

    session: Session;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private sessionService: SessionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSessions();
    }

    load(id) {
        this.sessionService.find(id)
            .subscribe((sessionResponse: HttpResponse<Session>) => {
                this.session = sessionResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSessions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sessionListModification',
            (response) => this.load(this.session.id)
        );
    }
}
